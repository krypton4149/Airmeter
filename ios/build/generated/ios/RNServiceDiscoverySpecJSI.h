/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook::react {


  class JSI_EXPORT NativeServiceDiscoveryCxxSpecJSI : public TurboModule {
protected:
  NativeServiceDiscoveryCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual jsi::Value startSearch(jsi::Runtime &rt, jsi::String serviceType) = 0;
  virtual jsi::Value stopSearch(jsi::Runtime &rt, jsi::String serviceType) = 0;
  virtual void addListener(jsi::Runtime &rt, jsi::String eventType) = 0;
  virtual void removeListeners(jsi::Runtime &rt, double count) = 0;

};

template <typename T>
class JSI_EXPORT NativeServiceDiscoveryCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

  static constexpr std::string_view kModuleName = "ServiceDiscovery";

protected:
  NativeServiceDiscoveryCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{NativeServiceDiscoveryCxxSpec::kModuleName}, jsInvoker),
      delegate_(reinterpret_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public NativeServiceDiscoveryCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeServiceDiscoveryCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    jsi::Value startSearch(jsi::Runtime &rt, jsi::String serviceType) override {
      static_assert(
          bridging::getParameterCount(&T::startSearch) == 2,
          "Expected startSearch(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::startSearch, jsInvoker_, instance_, std::move(serviceType));
    }
    jsi::Value stopSearch(jsi::Runtime &rt, jsi::String serviceType) override {
      static_assert(
          bridging::getParameterCount(&T::stopSearch) == 2,
          "Expected stopSearch(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::stopSearch, jsInvoker_, instance_, std::move(serviceType));
    }
    void addListener(jsi::Runtime &rt, jsi::String eventType) override {
      static_assert(
          bridging::getParameterCount(&T::addListener) == 2,
          "Expected addListener(...) to have 2 parameters");

      return bridging::callFromJs<void>(
          rt, &T::addListener, jsInvoker_, instance_, std::move(eventType));
    }
    void removeListeners(jsi::Runtime &rt, double count) override {
      static_assert(
          bridging::getParameterCount(&T::removeListeners) == 2,
          "Expected removeListeners(...) to have 2 parameters");

      return bridging::callFromJs<void>(
          rt, &T::removeListeners, jsInvoker_, instance_, std::move(count));
    }

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace facebook::react