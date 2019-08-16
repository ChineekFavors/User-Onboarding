import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({errors, touched, values, status}){
	const [user, setUser] = useState([]);
	
	useEffect(() =>{
		if (status){
			setUser([...user, status])
		}
	}, [user, status]);

	return (
		<div className="divForm">
		<Form className="form">
			<Field className="name" component="input" type="text" name="name" placeholder="Name" />
			{touched.name && errors.name && (
				<p className="errors">{errors.name}</p>
			)}
			<Field className="email" component="input" type="text" name="email" placeholder="Email" />
			{touched.email && errors.email && (
				<p className="errors">{errors.email}</p>
			)}
			<Field className="password" component="input" type="password" name="password" placeholder="Password" />
			{touched.password && errors.password && (
				<p className="errors">{errors.password}</p>
			)}
			<label className="label">
				Terms of Service
				<Field type="checkbox" name="tos" checked={values.tos}/>
				{touched.tos && errors.tos && (
					<p className="errors">{errors.tos}</p>
				)}
			</label>
			
			<button type="submit"className="submitButton">submit</button>	
		</Form>

		{user.map(user =>(
			<p key={user.id}>{user.name}</p>
			
		))}
		
    	</div>
  	);
}

const formikHOC = withFormik({
	mapPropsToValues({name, email, password, tos}){
		return {
			name: name || "",
			email: email || "",
			password: password || "",
			tos: tos || false
			
		};

	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required('name required'),
		email: Yup.string().email().required('email required'),
		password: Yup.string().required('password required'),
		tos: Yup.string().required('checkbox must be checked')
	}),

	handleSubmit(values, {setStatus}){
		axios.post('https://reqres.in/api/users', values)
		.then(res => {
			console.log(res);
			setStatus(res.data);
		})
		.catch(err => console.log('error', err));

	}
});

const userFormWithFormik = formikHOC(UserForm)
export default userFormWithFormik;