import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { FakePhoto, Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import UploadFakePhotoForm from "../activities/form/UploadFakePhotoForm";

interface Props {
    profile: Profile
}

enum AddPhotoMode {
    "View",
    "AddPhoto",
    "AddFakePhoto"
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const { profileStore: { isCurrentUser, loading, uploadPhoto, uploadFakePhoto, uploading } } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState<AddPhotoMode>(AddPhotoMode.View);

  function handlePhotoUpload(file: any) {
    uploadPhoto(file).then(() => setAddPhotoMode(AddPhotoMode.View));
  }

  function handleFakePhotoUpload(fakePhoto: FakePhoto) {
    uploadFakePhoto(fakePhoto).then(() => setAddPhotoMode(AddPhotoMode.View));
  }

  return (
    <Tab.Pane>
      <Grid>
      <Grid.Column width='16'>
            <Header floated='left' icon='image' content='Photos' />
                {isCurrentUser && addPhotoMode === AddPhotoMode.View && (
                    <>
                    <Button floated='right' basic 
                        content={'Add Photo'} 
                        onClick={() => setAddPhotoMode(AddPhotoMode.AddPhoto)} />

                    <Button floated='right' basic 
                        content={'Add Fake Photo'} 
                        onClick={() => setAddPhotoMode(AddPhotoMode.AddFakePhoto)} />
                    </>
                )}
                {isCurrentUser && addPhotoMode !== AddPhotoMode.View && (
                    <Button floated='right' basic 
                    content={'Canel Photo'} 
                    onClick={() => setAddPhotoMode(AddPhotoMode.View)} />
                )}
        </Grid.Column>
        <Grid.Column width="16">
            {addPhotoMode === AddPhotoMode.AddPhoto ? 
                (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                ) 
                : 
                (
                    <>
                    { addPhotoMode === AddPhotoMode.AddFakePhoto ?
                        (
                            <UploadFakePhotoForm uploadFakePhoto={handleFakePhotoUpload} loading={uploading} />
                        )
                        :
                        (
                            <Card.Group itemsPerRow={5}> {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                            </Card.Group>
                        )
                    }
                    </>
                )
                
            }
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});