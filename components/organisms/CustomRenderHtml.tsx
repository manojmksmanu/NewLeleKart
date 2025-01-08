import React from "react";
import RenderHtml from "react-native-render-html";

interface CustomRenderHtmlProps {
  source: { html: string };
  contentWidth: number;
  baseStyle?: any;
  tagsStyles?: any;
  enableCSSInlineProcessing?: boolean;
}

const CustomRenderHtml: React.FC<CustomRenderHtmlProps> = ({
  source,
  contentWidth,
  baseStyle = {},
  tagsStyles = {},
  enableCSSInlineProcessing = true,
}) => {
  return (
    <RenderHtml
      source={source}
      contentWidth={contentWidth}
      baseStyle={baseStyle}
      tagsStyles={tagsStyles}
      enableCSSInlineProcessing={enableCSSInlineProcessing}
      ignoredDomTags={["button"]} // Ignore the <button> tag
    />
  );
};

export default CustomRenderHtml;
