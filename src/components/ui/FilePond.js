import { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Filepond = (props) => {
  const [files, setFiles] = useState([]);

  return (
    <div className={props.className}>
      <FilePond
        files={files}
        allowReorder={true}
        allowMultiple={true}
        server='https://sr-portal-api.glensorbo.com/upload'
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default Filepond;
