import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, TabPane, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { FakePhoto, Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import UploadFakePhotoForm from "../activities/form/UploadFakePhotoForm";

interface Props {
    profile: Profile
}

enum AddPhotoMode { "View", "AddPhoto", "AddFakePhoto" }

export default observer(function ProfilePhotos({ profile }: Props) {
  const { profileStore: { isCurrentUser, loading, uploading, uploadPhoto, 
    uploadFakePhoto, setMainPhoto, deletePhoto } } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(AddPhotoMode.View);
  const [target, setTarget] = useState('');

  function handlePhotoUpload(file: any) {
    uploadPhoto(file).then(() => setAddPhotoMode(AddPhotoMode.View));
  }

  function handleFakePhotoUpload(fakePhoto: FakePhoto) {
    uploadFakePhoto(fakePhoto).then(() => setAddPhotoMode(AddPhotoMode.View));
  }

  function handleSetMain(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
}

function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
}

  return (
    <TabPane>
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
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={'main' + photo.id}
                                                loading={target === 'main' + photo.id && loading}
                                                disabled={photo.isMain}
                                                onClick={e => handleSetMain(photo, e)}
                                            />
                                            <Button
                                                name={photo.id}
                                                loading={loading && photo.id === target}
                                                onClick={(e) => handleDeletePhoto(photo, e)}
                                                basic
                                                color='red'
                                                icon='trash'
                                                disabled={photo.isMain}
                                            />
                                        </Button.Group>
                                    )}
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
    </TabPane>
  );
});