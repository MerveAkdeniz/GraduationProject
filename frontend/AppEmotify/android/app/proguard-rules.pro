# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Kullanılmayan kodları kaldır
-dontwarn
-keep public class * {
    public protected *;
}
-keepclassmembers class * {
    public *;
}
# AndroidX Kütüphaneleri
-keep class androidx.** { *; }
-dontwarn androidx.**
# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keepclassmembers class * {
    native <methods>;
}
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**
