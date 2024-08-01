#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "NSNetService+IPAddress.h"
#import "NSNetService+JSON.h"
#import "NSNetService+TXT.h"
#import "ServiceDiscovery.h"

FOUNDATION_EXPORT double react_native_service_discoveryVersionNumber;
FOUNDATION_EXPORT const unsigned char react_native_service_discoveryVersionString[];

