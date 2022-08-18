const handleFileChange = (event: any, setSrc: any) => {
  const fileObj = event.target.files;
  if (!fileObj[0]) {
    return;
  }
  const imagesUrl: any = [];
  for (let i = 0; i < fileObj.length; i++) {
    imagesUrl.push(URL.createObjectURL(fileObj[i]));
  }
  setSrc(imagesUrl);
};

export { handleFileChange };
