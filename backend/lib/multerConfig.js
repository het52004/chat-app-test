import multer from "multer";

const userProfileImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imageUploads/userProfileImages/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const userImage = multer({ storage: userProfileImage });

export default userImage;
