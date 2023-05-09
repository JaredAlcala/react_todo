import React from 'react'
import { Formik, Field, Form } from 'formik'
import {catSchema} from '../../Utilities/ValidationSchema'
import axios from 'axios'

export default function CatForm(props) {
    const handleSubmit = (values) => {
        console.log(values)
        if (!props.category) {
            const catToCreate = values

            axios.post(`http://todoapi.jaredalcala.com/api/categories`, catToCreate).then(() => {
                props.setShowCreate(false)
                props.getCategories()
            })
        }
        else{
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`http://todoapi.jaredalcala.com/api/categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {(errors, touched) => (
                <Form id='catForm' className='row text-center m-auto'>
                    <div className="form-group p-1 mb-1 btn-md">
                        <Field name='catName' className='form-control' placeholder='Category Name' />
                        {errors.catName && touched.catName ? <div className="text-danger">{errors.catName}</div> : null }
                    </div>
                    <div className="form-group p-1 mb-1 btn-md">
                        <Field name='catDesc' as='textarea' className='form-control' placeholder='Description' />
                        {errors.catDesc && touched.catDesc ? (
                            <div className="text-danger">{errors.catDesc}</div>
                        ) : null }
                    </div>
                    <div className="form-group m-1">
                        <button className="btn btn-success" type='submit'>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}