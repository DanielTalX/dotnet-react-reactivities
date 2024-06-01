import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextAreaInput from "../../../app/common/form/MyTextAreaInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";


const ActivityForm = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity,
    loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required('The event title is required'),
    category: Yup.string().required('The event category is required'),
    description: Yup.string().required(),
    date: Yup.string().required('Date is required'), // .nullable()
    venue: Yup.string().required(),
    city: Yup.string().required(),
});

  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id){
      let newActivity = { ...activity, id: uuid()};
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`)); 
    }
    else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`)); 
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading activity..."/>;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={activity}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput placeholder="Title" name="title"/>
              <MyTextAreaInput rows={2} placeholder="Description" name="description"/>
              <MySelectInput options={categoryOptions} placeholder="Category" name="category"/>
              <MyDateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
              <Header content='Location Details' sub color='teal' />
              <MyTextInput placeholder="City" name="city"/>
              <MyTextInput placeholder="Venue" name="venue"/>
              <Button 
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting} floated="right" positive type="submit" content="Submit"></Button>
              <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
            </Form>
          )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
