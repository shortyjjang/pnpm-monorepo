import React, { forwardRef } from "react";
import { Platform, TouchableOpacity, Text, StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

// 공통 타입 정의
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "default" | "danger";
  className?: string;
  style?: any;
  [key: string]: any;
};

/**
 * 크로스 플랫폼 버튼 컴포넌트
 */
const Button = forwardRef<any, ButtonProps>(
  ({ children, variant = "default", className, style, ...props }, ref) => {
    // 웹 환경은 그대로 className 사용
    if (Platform.OS === "web") {
      const buttonClass = twMerge(
        "px-4 py-2 rounded-md cursor-pointer",
        className,
        variant === "primary"
          ? "bg-blue-500 text-white"
          : variant === "danger"
            ? "border border-red-500 text-red-500"
            : "border border-gray-300 text-black"
      );
      
      return (
        <button
          ref={ref}
          {...props}
          className={buttonClass}
        >
          {children}
        </button>
      );
    }

    // 네이티브 환경에서는 스타일을 사용
    const defaultStyle = [
      styles.button,
      variant === "primary"
        ? styles.primary
        : variant === "danger"
          ? styles.danger
          : styles.default,
      style
    ];

    return (
      <TouchableOpacity 
        {...props} 
        ref={ref}
        style={defaultStyle}
      >
        <Text style={variant === "primary" ? { color: 'white' } : {}}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

// 네이티브용 기본 스타일
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: '#3B82F6',
  },
  danger: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  default: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
  }
});

Button.displayName = "Button";

export default Button;
