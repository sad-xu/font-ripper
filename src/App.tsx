import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  TextField,
  Toolbar,
} from "@mui/material";
import { Font, Glyph, parse } from "opentype.js";
import { QUICK_TEXT, downloadFont, setCssFont } from "./utils";
import { ChangeEvent, useMemo, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadBox from "./components/UploadBox";
import TextBox from "./components/TextBox";

const App = () => {
  const [font, setFont] = useState<Font | null>(null);
  const [inputText, setInputText] = useState("");

  /** 解析字体文件 */
  const parseFontFile = (file: File) => {
    const reader = new FileReader();
    setCssFont(URL.createObjectURL(file));
    reader.onload = function (e) {
      setFont(() => {
        const parsedFont = parse(reader.result);
        console.log(parsedFont);
        return parsedFont;
      });
    };
    reader.readAsArrayBuffer(file);
  };

  /** 获取输入文字去重数量 */
  const getTextNum = () => {
    const map: { [key: number]: true } = {};
    let num = 0;
    for (let i = 0; i < inputText.length; i++) {
      const code = inputText.charCodeAt(i);
      if (!map[code]) {
        map[code] = true;
        num++;
      }
    }
    return num;
  };

  /** 快捷输入 */
  const addQuickText = (key: string) => {
    setInputText(() => {
      const str = QUICK_TEXT[key] || "";
      return inputText + `${str}\n`;
    });
  };

  /** 下载字体 */
  const handleDownload = () => {
    if (!font) return;
    //获取输入文字unicode
    const map: { [key: number]: true } = { 0: true, 32: true };
    for (let i = 0; i < inputText.length; i++) {
      const code = inputText.charCodeAt(i);
      if (!map[code]) {
        map[code] = true;
      }
    }

    const selectedCode: Set<number> = new Set();

    Object.keys(map).forEach((unicode) =>
      selectedCode.add(font.tables.cmap.glyphIndexMap[unicode] || 0)
    );

    const glyphs: Glyph[] = [];

    selectedCode.forEach((index) => {
      const g = (font.glyphs as any).glyphs[index];
      glyphs.push(g);
    });

    const newFont = new Font({
      familyName: font.names.fontFamily.en,
      styleName: font.names.fontSubfamily.en || "Medium",
      unitsPerEm: font.unitsPerEm,
      ascender: font.ascender,
      descender: font.descender,
      createdTimestamp: +new Date(),
      glyphs: glyphs,
    });
    const buffer2 = newFont.toArrayBuffer();

    downloadFont(font.names.fontFamily.en, buffer2);
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <h2>Font Ripper</h2>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          p: 2,
        }}
      >
        {useMemo(
          () => (
            <UploadBox
              font={font}
              onUpload={(file) => parseFontFile(file)}
            ></UploadBox>
          ),
          [font]
        )}

        <TextField
          sx={{
            flex: 4,
            "& .MuiInputBase-input": {
              fontFamily: '"custom"',
            },
          }}
          label="Text"
          multiline
          rows={10}
          value={inputText}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInputText(event.target.value);
          }}
        />
      </Box>
      <Divider></Divider>
      {/*  */}
      <Box
        sx={{
          display: "flex",
          p: 2,
        }}
      >
        <TextBox font={font}></TextBox>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 6 }}>已输入字体数: {getTextNum()}</Box>
            <Box>
              快捷输入:
              <ButtonGroup size="small" variant="contained" sx={{ ml: 2 }}>
                <Button onClick={() => addQuickText("number")}>数字</Button>
                <Button onClick={() => addQuickText("letter")}>字母</Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" size="large" onClick={handleDownload}>
              <FileDownloadIcon></FileDownloadIcon>
              导出
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
