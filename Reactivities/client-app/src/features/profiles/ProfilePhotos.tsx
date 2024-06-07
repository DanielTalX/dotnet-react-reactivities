import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
//import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const { profileStore: { isCurrentUser, loading } } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
      <Grid.Column width='16'>
            <Header floated='left' icon='image' content='Photos' />
                {isCurrentUser && (
                    <Button floated='right' basic 
                        content={addPhotoMode ? 'Cancel' : 'Add' + ' Photo'} 
                        onClick={() => setAddPhotoMode(!addPhotoMode)} />
                )}
        </Grid.Column>
        <Grid.Column width="16">
            {addPhotoMode ? 
                (
                    <h1>PhotoUploadWidget goes here</h1>
                ) : 
                (
                    <Card.Group itemsPerRow={5}> {profile.photos?.map(photo => (
                        <Card key={photo.id}>
                            <Image src={photo.url} />
                        </Card>
                    ))}
                    </Card.Group>
                )
            }
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});