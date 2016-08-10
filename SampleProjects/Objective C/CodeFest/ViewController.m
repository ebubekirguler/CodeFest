//
//  ViewController.m
//  CodeFest
//
//  Created by mustafa tanisir on 25/07/16.
//  Copyright © 2016 kuveytturk. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

-(IBAction)getButtonClicked:(id)sender
{
    self.serviceType=1;
    [self authentication];
}

-(IBAction)postButtonClicked:(id)sender
{
    self.serviceType=2;
    [self authentication];
}

-(void)authentication
{
    NSString *post = [NSString stringWithFormat:@"accountNumber=999999&password=1234"];
    
    NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
    
    NSString *postLength = [NSString stringWithFormat:@"%lu", (unsigned long)[postData length]];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setURL:[NSURL URLWithString:@"http://ktcodefest.azurewebsites.net/auth"]];
    [request setHTTPMethod:@"POST"];
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    [request setHTTPBody:postData];
    
    NSURLConnection *conn = [[NSURLConnection alloc] initWithRequest:request delegate:self];
    
    
}

//Servisten dönen cevabı yakalar
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData*)data
{
    NSLog(@"Data alındı");
    
    NSDictionary *responseAsDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
    NSDictionary *resultDict = [responseAsDictionary objectForKey:@"result"];
    NSString *accessToken = [resultDict objectForKey:@"accessToken"];
    
    if(self.serviceType == 1)
    {
        [self callGETService:accessToken];
    }
    if(self.serviceType == 2)
    {
        [self callPOSTService:accessToken];
    }
}

//İşlem yapmak istediğimiz post servis call edilir
-(void)callPOSTService:(NSString*)accessToken
{
    NSString *requestParams = [NSString stringWithFormat:@"creditCardNumber=1234567890123456&cardExpireDateYear=2019&cardExpireDateMonth=12&CVV2=0000&cardHolderName=Mustafa&cardType=Visa&amount=100&merchantId=1&currencyCode=1&goldscore=5"];
    
    /*NSString *requestParams = [NSString stringWithFormat:@"creditCardNumber=1234567890123456&cardExpireDateYear=2019&cardExpireDateMonth=12&CVV2=0000&cardHolderName=Mustafa&cardType=Visa&amount=100&merchantId=1&orderId=2&provisionNumber=1"];*/
    
    
    NSData *dataReq = [requestParams dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
    
    NSString *dataLength = [NSString stringWithFormat:@"%lu", (unsigned long)[dataReq length]];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setURL:[NSURL URLWithString:@"http://ktcodefest.azurewebsites.net/virtualpos/goldscoreusage"]];
    [request setHTTPMethod:@"POST"];
    [request setValue:dataLength forHTTPHeaderField:@"Content-Length"];
    [request setValue:accessToken forHTTPHeaderField:@"authorization"];
    
    [request setHTTPBody:dataReq];
    
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    [[session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        
        
        NSString *responseAsString = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
        NSLog(@"responseAsString : %@", responseAsString);
        
        // NSDictionary *responseAsDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
        
    }] resume];
    
}

//İşlem yapmak istediğimiz get servis call edilir
-(void)callGETService:(NSString*)accessToken
{
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setURL:[NSURL URLWithString:@"http://ktcodefest.azurewebsites.net/virtualpos/goldscore/23456"]];
    [request setHTTPMethod:@"GET"];
    [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request addValue:accessToken forHTTPHeaderField:@"authorization"];
    
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    [[session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        
        
        NSString *responseAsString = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
        NSLog(@"responseAsString : %@", responseAsString);
        
        NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
        NSDictionary *result = [responseDictionary objectForKey:@"result"];
        NSString *score = [result objectForKey:@"goldScore"];
        NSLog(@"responseDictionary.result.goldScore : %@", score);
        
    }] resume];
}

@end
