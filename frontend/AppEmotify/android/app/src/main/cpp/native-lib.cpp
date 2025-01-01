#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_appemotify_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Merhaba, C++ kodundan!";
    return env->NewStringUTF(hello.c_str());
}
