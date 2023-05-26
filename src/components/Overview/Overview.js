import { injectIntl } from "react-intl";
import LanguageChanger from "../LanguageChanger/LanguageChanger";

function Overview() {
  return (
    <div>
      <LanguageChanger />
      this is overview page
    </div>
  );
}

export default injectIntl(Overview);
