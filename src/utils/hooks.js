import { useMediaQuery } from "react-responsive";

export const mediaHook = (Component) => {
  return function WrappedComponent(props) {
    const isTinylMobileScreen = useMediaQuery({ maxWidth: "328px" });
    const isTinyMobileScreen2 = useMediaQuery({ maxWidth: "375px" });
    const isSmallMobileScreen = useMediaQuery({ maxWidth: "576px" });
    const isMediumMobileScreen = useMediaQuery({ maxWidth: "768px" });
    const isMediumMobileScreen2 = useMediaQuery({ maxWidth: "820px" });
    const isLargeMobileScreen = useMediaQuery({ maxWidth: "992px" });
    const isLargeMobileScreen2 = useMediaQuery({ maxWidth: "1280px" });
    const isXLargeMobileScreen = useMediaQuery({ maxWidth: "1440px" });
    const mobileScreenSizes = {
      isTinylMobileScreen,
      isTinyMobileScreen2,
      isSmallMobileScreen,
      isMediumMobileScreen,
      isLargeMobileScreen,
      isLargeMobileScreen2,
      isXLargeMobileScreen,
      isMediumMobileScreen2,
    };
    return <Component {...props} mobileScreenSizes={mobileScreenSizes} />;
  };
};
