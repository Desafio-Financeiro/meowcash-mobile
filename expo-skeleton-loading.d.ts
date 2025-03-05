declare module "expo-skeleton-loading" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  interface SkeletonLoadingProps extends ViewProps {
    background: string;
    highlight: string;
  }

  const SkeletonLoading: ComponentType<SkeletonLoadingProps>;

  export default SkeletonLoading;
}
