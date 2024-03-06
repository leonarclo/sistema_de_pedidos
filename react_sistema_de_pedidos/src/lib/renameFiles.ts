import moment from "moment";

export const renameFiles = (array: File[]) => {
  return array.map((file) => {
    const timestamp = moment(Date.now()).format("YYYY-MM-DD_HH-mm");
    const newName = `${timestamp}-${file.name}`;
    const renamedFile = new File([file], newName, {
      type: file.type,
    });
    return renamedFile;
  });
};
