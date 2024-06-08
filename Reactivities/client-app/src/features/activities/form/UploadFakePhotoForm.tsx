import { useEffect, useState } from "react";
import { Button, Card, Grid, Header, Image, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { FakePhoto } from "../../../app/models/profile";

interface Props {
  loading: boolean;
  uploadFakePhoto: (fakePhoto: FakePhoto) => void;
}

const UploadFakePhotoForm = ({ loading, uploadFakePhoto}: Props) => {
  const [fakePhoto, setFakePhoto] = useState<FakePhoto>({ Url: ""});
  const [ showPreview, setShowPreview] = useState<boolean>(false);

  const validationSchema = Yup.object({
    Url: Yup.string().required('The image url is required'),
  });

  function handleFormSubmit(fakePhoto: FakePhoto) {
    setShowPreview(true);
    setFakePhoto(fakePhoto);
  }

  function handleUpload() {
    uploadFakePhoto(fakePhoto)
  }

  function handleReset() {
    setShowPreview(false);
    setFakePhoto({Url: ""});
  }

  return (
    <Segment clearing>
      <Grid>
      <Grid.Column width='16'>
      <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={fakePhoto}
          onSubmit={values => handleFormSubmit(values)}
          >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput placeholder="Image url" name="Url" disabled={showPreview}/>
              <Button 
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting} floated="right" positive type="submit" content="Show preview"></Button>
            </Form>
          )}
      </Formik>
      </Grid.Column>
      
      <Grid.Column width='16' textAlign="center">
      { fakePhoto.Url.length > 0 && (
        <Card>
          <Image src={fakePhoto.Url} />
          <Button.Group>
              <Button loading={loading} onClick={handleUpload} positive icon='check' />
              <Button disabled={loading} onClick={handleReset} icon='close' />
          </Button.Group>
        </Card>
      )}
      </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(UploadFakePhotoForm);
