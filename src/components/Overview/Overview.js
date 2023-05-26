import { injectIntl } from "react-intl";
import ASLanguageChanger from "../ASLanguageChanger/ASLanguageChanger";

function Overview() {
  return (
    <div>
      <ASLanguageChanger />
      this is overview page
    </div>
  );
}

export default injectIntl(Overview);
