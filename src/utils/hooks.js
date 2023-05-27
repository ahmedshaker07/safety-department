import useMedia from "use-media";

export const mediaHook = (Component) => {
  return function WrappedComponent(props) {
    const isTinylMobileScreen = useMedia({ maxWidth: "328px" });
    const isTinyMobileScreen2 = useMedia({ maxWidth: "375px" });
    const isSmallMobileScreen = useMedia({ maxWidth: "576px" });
    const isMediumMobileScreen = useMedia({ maxWidth: "768px" });
    const isMediumMobileScreen2 = useMedia({ maxWidth: "820px" });
    const isLargeMobileScreen = useMedia({ maxWidth: "992px" });
    const isLargeMobileScreen2 = useMedia({ maxWidth: "1280px" });
    const isXLargeMobileScreen = useMedia({ maxWidth: "1440px" });
    const mobileScreenSizes = {
      isTinylMobileScreen,
      isTinyMobileScreen2,
      isSmallMobileScreen,
      isMediumMobileScreen,
      isLargeMobileScreen,
      isLargeMobileScreen2,
      isXLargeMobileScreen,
      isMediumMobileScreen2
    };
    return <Component {...props} mobileScreenSizes={mobileScreenSizes} />;
  };
};
