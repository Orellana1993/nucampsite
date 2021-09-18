
import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react'
import { Control, LocalForm, Errors } from 'react-redux-form';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

const valid = val => val
const maxLen = len => val => !val || (val.length) < len 
const minLen = len => val => val && (val.length) > len 

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
        modalOpen: false,
        toggleOpen: false
        }
        this.handleModal = this.handleModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
       
        
    }
    toggleModal() {
        this.setState({toggleOpen: !this.state.toggleOpen})
    }

    handleModal() {
         this.setState({modalOpen: !this.state.modalOpen})
    }
    handleSubmit(values) {
      this.toggleModal();
      this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text)
    }
    
    render(){
    return(  
        <React.Fragment>
            <Button onClick={this.handleModal} className='btn-lg' outline><i className='fa fa-pencil'></i>Submit Comment</Button>

            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.handleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values =>this.handleSubmit(values)}>
                        <div className='form-group'>
                            <Label hmtlFor='rating'>Rating</Label>
                            <div className='form-group'>
                                <Control.select model='.rating' id='rating' name='rating' className='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <Label hmtlFor='author'>Your Name</Label>
                                <Control.text  model='.author' id='author' name='auhtor' placeholder='Your Name' className='form-control'
                                 validators={{
                                    valid,
                                    maxLen: maxLen(15),
                                    minLen: minLen(2)
                                 }}
                                />
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    component='div'
                                    messages={{
                                        valid: 'Required',
                                        minLen: 'Must be at least 2 characters',
                                        maxLen: 'Must be 15 characters or less' 
                                    }}
                                />
                            
                        </div>
                        <div className='form-group'>
                            <Label hmtlFor='text'>Comment</Label>    
                                <Control.textarea model='.text' id='text' name='text' className='form-control'/>
                        </div>
                        <div className='form-group'>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </LocalForm>
                </ModalBody>    
            </Modal>
         </React.Fragment>    
        )
    }
}
 
 function RenderCampsite({campsite}) {
    return(
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

 function RenderComments({comments, addComment, campsiteId}) {
    if (comments) {
        return (
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                    {
                    comments.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <p>{comment.text} -- {comment.author},<br/>
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                    )  
                    })
                    }
                <CommentForm campsiteId={campsiteId} addComment={addComment}/>
            </div>
        )

        
    }
}

function CampsiteInfo(props) {
     if (props.campsite){
         return (
         <div className='container'>
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>

            <div className='row'>
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments ={props.comments} 
                addComment={props.addComment}
                campsiteId={props.campsite.id}
                />
            </div>
        </div>
        )
     }

     
     return (
         <div>

         </div>
     )
}



export default CampsiteInfo; 