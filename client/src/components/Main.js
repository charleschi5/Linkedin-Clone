import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostModal from './PostModal';

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const post = useSelector((state) => state.postState.postData);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    setShowModal((preShowModal) => !preShowModal);
  };
  return (
    <Container>
      <SharBox>
        <div>
          {user?.result?.imageUrl ? (
            <img src={user?.result?.imageUrl} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={handleClick}>Write a post</button>
        </div>

        <div>
          <button>
            <img src="/images/photo-icon.png" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.png" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/calendar-icon.png" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.png" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </SharBox>
      <div>
        <Article>
          <SharedActor>
            <a>
              <img src="/images/user.svg" alt="" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="/images/ellipsis.svg" alt="" />
            </button>
          </SharedActor>
          <Description>{post ? post.editorText : 'Description'}</Description>
          <SharedImg>
            {post ? (
              <a>
                <img src={JSON.parse(post.shareImage)} alt="" />
              </a>
            ) : (
              <a>
                <img src="/images/shared-image.jpg" alt="" />
              </a>
            )}
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img src="/images/thumbs-up.svg" alt="" />
                <img src="/images/clapping-hands.svg" alt="" />
                <span>950</span>
              </button>
            </li>
            <li>
              <a>197 comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="/images/like-icon.png" alt="" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comment-icon.png" alt="" />
              <span>Comments</span>
            </button>
            <button>
              <img src="/images/share-icon.png" alt="" />
              <span>Share</span>
            </button>
            <button>
              <img src="/images/send-icon.png" alt="" />
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
      </div>
      <PostModal
        showModal={showModal}
        handleClick={handleClick}
        setShowModal={setShowModal}
      />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const SharBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 25px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    img {
      width: 24px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style-type: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      align-items: center;
      background: transparent;
      border: none;
      img {
        width: 15px;
      }
      span {
        font-size: 13px;
        font-weight: 400;
        color: gray;
        &:hover {
          color: #0a66c2;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    border: none;
    margin: 0 4px;
    padding: 8px;
    background: transparent;
    &:hover {
      background: #eee;
      border-radius: 5px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
    img {
      width: 20px;
    }
  }
`;

export default Main;
