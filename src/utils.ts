const CUSTOM_STYLE_ID = "customCss";

/** 快捷输入 */
export const QUICK_TEXT: { [k: string]: string } = {
  number: "1234567890.+-%",
  letter: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz",
};

/** 动态设置css字体 */
export function setCssFont(url: string) {
  const cssDom = document.getElementById(CUSTOM_STYLE_ID);
  const cssText = document.createTextNode(`@font-face {
    font-family: custom;
    src: url('${url}');
  }`);
  if (cssDom) {
    cssDom.innerHTML = "";
    cssDom.appendChild(cssText);
  } else {
    const style = document.createElement("style");
    style.id = CUSTOM_STYLE_ID;
    style.appendChild(cssText);
    document.head.appendChild(style);
  }
}

/** 下载字体 */
export function downloadFont(fileName: string, buffer: ArrayBuffer) {
  const blob = new Blob([new DataView(buffer)], { type: "font/opentype" });
  const link = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = `${fileName}.ttf`;
  link.click();
  window.URL.revokeObjectURL(url);
}
