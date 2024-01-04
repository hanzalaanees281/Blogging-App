import React, {useState, useEffect} from 'react'
import {Container, PostForm} from "../components/index"
import {useNavigate, useParams} from "react-router-dom"
import appwriteService from "../appwrite/config"

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost((slug) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

export default EditPost
