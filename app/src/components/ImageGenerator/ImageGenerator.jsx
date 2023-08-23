import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import default_image from '../assets/default_image.svg'

const ImageGeneratorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 20px;
    gap: 30px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;

const Header = styled.div`
    font-size: 70px;
    font-weight: 500;
    padding-bottom: 30px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }

    span {
        color: #de1b89;
        font-weight: 600;
    }
`;

const ImageLoading = styled.div`
    display: flex;
    flex-direction: column;

    .image {
        img {
            width: 512px;

            @media (max-width: 768px) {
                width: 100%;
            }
        }
    }

    .loading-bar {
        width: 0px;
        height: 8px;
        background: #de1b89;
    }

    .loading-bar-full {
        width: 512px;
        height: 8px;
        background: #de1b89;
        transition: 15s;

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .loading-text {
        font-size: 18px;
    }

    .display-none {
        display: none;
    }
`;

const SearchBox = styled.div`
    display: flex;
    width: 1000px;
    height: 95px;
    justify-content: space-around;
    align-items: center;
    border-radius: 50px;
    background: #1f3540;

    @media (max-width: 768px) {
        width: 95%;
        height: 115px;
        flex-direction: column;
        border-radius: 0;
        background: transparent;
        gap: 20px;
    }

    input {
        width: 600px;
        height: 50px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 18px;
        color: #fff;
        padding-left: 35px;
        padding-right: 35px;

        @media (max-width: 768px) {
            width: 80%;
            height: 115px;
            border-radius: 50px;
            background: #1f3540;
        }
    }

    input::placeholder {
        color: #999;
    }

    .generate-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 85px;
        font-size: 20px;
        border-radius: 50px;
        background: #de1b89;
        cursor: pointer;

        @media (max-width: 768px) {
            width: 90%;
            height: 95px;
        }
    }
`;

const Footer = styled.div`
    color: #999;

    a {
        text-decoration: none;
        color: #de1b89;
        font-weight: 500;
    }
`;

export const ImageGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [image_url, setImage_url] = useState('/');
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }

        setLoading(true);

        const response = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer YOUR_KEY",
                    "User-Agent": "Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            }
        );

        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    };

    return (
        <ImageGeneratorWrapper>
            <Header>Ai image <span>generator</span></Header>
            <ImageLoading>
                <div className='image'><img src={image_url === '/' ? default_image : image_url} alt='' /></div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </ImageLoading>
            <SearchBox>
                <input type='text' ref={inputRef} placeholder='Describe What You Want To See' />
                <div className='generate-btn' onClick={() => imageGenerator()}>Generate</div>
            </SearchBox>
            <Footer>Created by <a href='mailto:dgd.contact@gmail.com'>Daniel Goulard</a> with <a href='https://openai.com/blog/openai-api'>OpenAI API</a></Footer>
        </ImageGeneratorWrapper>
    );
}
