import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions';

const PostModal = ({ handleClick, showModal, setShowModal }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [assetArea, setAssetArea] = useState('');
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    editorText: '',
    shareImage: '',
    videoLink: '',
  });

  const handlePost = () => {
    dispatch(createPost(postData));
    setShowModal((showModal) => !showModal);
  };

  const handleChange = (e) => {
    const image = e.target.files[0];

    const imageUrl = JSON.stringify(URL.createObjectURL(image));
    if (image === '' || image === undefined) {
      alert(`not a image, the file is ${typeof image}`);
      return;
    }
    setPostData({ ...postData, shareImage: imageUrl });
  };

  const switchAssetArea = (area) => {
    setPostData({
      ...postData,
      shareImage: '',
      videoLink: '',
    });
    setAssetArea(area);
  };

  const reset = (e) => {
    setPostData({
      editorText: '',
      shareImage: '',
      videoLink: '',
    });
    setAssetArea('');
    handleClick(e);
  };

  return (
    <>
      {showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={reset}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user?.result?.imageUrl ? (
                  <img src={user?.result?.imageUrl} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user?.result?.name}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={postData.editorText}
                  onChange={(e) =>
                    setPostData({ ...postData, editorText: e.target.value })
                  }
                  placeholder="What do you wanna talk about?"
                  autoFocus={true}
                />
                {assetArea === 'image' ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                    <p
                      style={{
                        marginTop: '5px',
                      }}
                    >
                      <label
                        htmlFor="file"
                        style={{
                          background: 'white',
                          color: '#0a66c2',
                          padding: '5px',
                          fontWeight: '600',
                        }}
                      >
                        Select an image to share
                      </label>
                    </p>
                    {postData.shareImage && (
                      <img src={JSON.parse(postData.shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === 'media' && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={postData.videoLink}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            videoLink: e.target.value,
                          })
                        }
                      />
                      {postData.videoLink && (
                        <ReactPlayer width={'100%'} url={postData.videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => setAssetArea('image')}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => setAssetArea('media')}>
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/share-comment.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!postData.editorText ? true : false}
                onClick={handlePost}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  border: none;
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  border: none;
  min-width: 40px;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: ${(props) => (props.disabled ? 'rgba(0,0,0,0.1)' : '#0a66c2')};
  color: ${(props) => (props.disabled ? 'rgba(1,1,1,0.2)' : 'white')};
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const Editor = styled.div`
  padding: 12px 24px 12px 12px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 10px;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
