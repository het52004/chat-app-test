import fs from "fs";

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      return err;
    }
  });
};
