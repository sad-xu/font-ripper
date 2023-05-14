import { Box, Chip, Paper } from "@mui/material";
import { ChangeEvent, useEffect, useRef } from "react";
import { Font } from "opentype.js";

/** 上传框 */
const UploadBox = ({
  font,
  onUpload,
}: {
  font: Font | null;
  onUpload: (file: File) => void;
}) => {
  const uploadInput = useRef<HTMLInputElement>(null);

  const boxSx = {
    m: 2,
  };

  const textSx = {
    display: "inline-block",
    minWidth: "60px",
  };

  useEffect(() => {
    //拖拽上传
    const dropTarget = document.getElementById("dropBox");
    if (!dropTarget) return;
    dropTarget.ondragover = function (e) {
      e.preventDefault();
    };
    dropTarget.ondrop = function (e) {
      e.preventDefault();
      if (!e.dataTransfer || !e.dataTransfer.files) {
        return;
      }
      onUpload(e.dataTransfer.files[0]);
    };
  }, [onUpload]);

  /** 点击上传 */
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Paper
      id="dropBox"
      sx={{
        mr: 3,
        flex: 1,
      }}
      onClick={() => uploadInput.current?.click()}
    >
      <input
        id="hiddenInput"
        ref={uploadInput}
        type="file"
        accept=".ttf,.woff,.otf"
        onChange={handleUpload}
      />
      {font == null ? (
        <Box
          sx={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          <Box>上传字体文件</Box>
          <Box>支持ttf,woff,otf</Box>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: 16,
            width: "100%",
            pr: 2,
          }}
        >
          <Box sx={boxSx}>
            <Box sx={textSx}>字体名:</Box>
            <Chip
              color="success"
              size="small"
              label={font.names.fontFamily.en}
            />
          </Box>
          <Box sx={boxSx}>
            <Box sx={textSx}>字重:</Box>
            <Chip
              color="primary"
              size="small"
              label={font.names.fontSubfamily.en}
            />
          </Box>
          <Box sx={boxSx}>
            <Box sx={textSx}>数量:</Box>
            <Chip color="primary" size="small" label={font.numGlyphs} />
          </Box>
          <Box sx={{ textAlign: "right" }}>{font.names.copyright.en}</Box>
        </Box>
      )}
    </Paper>
  );
};

export default UploadBox;
