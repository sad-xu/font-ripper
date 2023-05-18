import { Box, Pagination, Paper } from "@mui/material";
import { Font } from "opentype.js";
import { ChangeEvent, useEffect, useState } from "react";

/** 文字展示框 */
const TextBox = ({ font }: { font: Font | null }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [textList, setTextList] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    if (font) {
      setPage(1);
      setTotalPage(Math.ceil(font.numGlyphs / 100));
      generateTextStr(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font]);

  const generateTextStr = (pageIndex: number) => {
    if (font) {
      const start = (pageIndex - 1) * 100;
      const end = start + 100;
      const list = [];
      for (let i = start; i < end; i++) {
        const code = (font.glyphs as any).glyphs[i]?.unicode;
        if (code) {
          list.push(String.fromCodePoint(code));
        } else {
          list.push(undefined);
        }
      }
      setTextList(list);
    }
  };

  const handlePageChange = (e: ChangeEvent<unknown>, val: number) => {
    setPage(val);
    generateTextStr(val);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          height: "230px",
          width: "230px",
          display: "flex",
          flexWrap: "wrap",
          mb: 1,
          padding: "5px",
          wordBreak: "break-all",
          fontFamily: '"custom"',
          ".text": {
            display: "inline-block",
            width: "20px",
            height: "20px",
            margin: "1px",
            fontSize: "12px",
            textAlign: "center",
            borderRadius: "4px",
          },
          ".empty-text": {
            backgroundColor: "#9E9E9E",
          },
        }}
      >
        {textList.map((t, i) => (
          <span
            className={`text${t === undefined ? " empty-text" : ""}`}
            key={i}
          >
            {t}
          </span>
        ))}
      </Paper>
      {font && (
        <Pagination
          size="small"
          count={totalPage}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </Box>
  );
};

export default TextBox;
