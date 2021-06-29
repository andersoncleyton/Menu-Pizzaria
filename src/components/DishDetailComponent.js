import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Media, Breadcrumb, BreadcrumbItem, Button, Row,
    Modal, ModalHeader, ModalBody, Label,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderComments({ comments, addComment, dishId }) {

    if (comments != null) {



        const commentsJSX = comments.map((comment) => {
            return (
                <li>
                    <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                            {comment.comment}
                        </li>
                        <li className="mb-2">
                            -- {comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                        </li>
                    </ul>
                </li>

            );
        });

        if (comments != null) {
            return (
                <div>
                    {commentsJSX}
                </div>
            );
        }
    }

    return (
        <div>
        </div>
    );
}

function RenderDish({ dish }) {

    if (dish != null) {
        return (

            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>



        );
    }
    else {
        return (<div></div>);
    }

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmmitedComment = this.handleSubmmitedComment.bind(this);
    }

    handleSubmmitedComment(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.comment);
        //this.props.addComment(this.props.dish.id, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row" >
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <RenderDish dish={this.props.dish}   ></RenderDish>
                        <div className="col-12 col-md-5 m-1">
                            <h3>Comments</h3>
                            <Media className="list-unstyled">
                                <RenderComments comments={this.props.comments}></RenderComments>
                                <li>
                                    <ul className="list-unstyled mb-4">
                                        <li>
                                            <div>
                                                <Button onClick={this.toggleModal} outline type="submit" name="submit">
                                                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                                                </Button>
                                                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                                    <ModalHeader toggle={this.toggleModal}>
                                                        Envide seu comentário
                                                    </ModalHeader>
                                                    <ModalBody>
                                                        <LocalForm onSubmit={(values) => this.handleSubmmitedComment(values)}>
                                                            <Row className="form-group">
                                                                <Control.select model=".rating" name="rating" className="form-control">
                                                                    <option selected="selected">1</option>
                                                                    <option>2</option>
                                                                    <option>3</option>
                                                                    <option>4</option>
                                                                    <option>5</option>
                                                                </Control.select>
                                                            </Row>
                                                            <Row className="form-group">
                                                                <Label htmlFor="author">Your Name</Label>

                                                                <Control.text model=".author" id="author" name="author"
                                                                    placeholder="Your Name" className="form-control"
                                                                    validators={{
                                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                                    }} />

                                                                <Errors
                                                                    className="text-danger"
                                                                    model=".yourName"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required',
                                                                        minLength: 'Must be greater than 2 characters',
                                                                        maxLength: 'Must be 15 characters or less'
                                                                    }}
                                                                />

                                                            </Row>
                                                            <Row className="form-group">
                                                                <Label htmlFor="comment" md={2}>Your Feedback</Label>

                                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                                    rows="12"
                                                                    className="form-control" />
                                                            </Row>
                                                            <Row className="form-group">

                                                                <Button type="submit" color="primary">
                                                                    Send Feedback
                                                                </Button>
                                                            </Row>
                                                        </LocalForm>
                                                    </ModalBody>
                                                </Modal>
                                            </div>
                                        </li>
                                    </ul>
                                </li>=
                            </Media>
                        </div>
                    </div>
                </div>

            )
        }
    }
}



export default DishDetail;