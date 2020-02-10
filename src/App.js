import React from "react"
import styled, { keyframes } from 'styled-components'
import * as images from './static/images'

const Logo = require('./static/logo.PNG')
const Beton = require('./static/beton.jpg')

const Page = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: auto;
margin: 0;
padding-bottom: 50px;
display: flex;
flex-direction: column;
justify-content: center;

background-image: url(${Beton});
background-repeat: repeat;
`

const Header = styled.div`
width: 100%;
height: 70px;
color: purple;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
font-size: 30px;

padding: 20px;
`

const WrapperOfWrapper = styled.div`
position: relative;
height: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
height: 8em;
width: 8em;
margin: 20px;


perspective: 1000px;
perspective-origin: center -4em;
`

const Container = styled.div`
transform-style: preserve-3d;
animation: rotate 10s infinite linear;
width: 100%;
height: 100%;
transform: rotateY(0deg) rotateX(0deg);
transition: 0.8s ease-in-out;

&:hover {
transform: ${props =>
    props.side === 'Bottom' ? 'rotateX(90deg)' :
      props.side === 'Left' ? 'rotateY(90deg)' :
        props.side === 'Right' ? 'rotateY(-90deg)' :
          'rotateY(90deg)'};
}
`

const Side = styled.div`
position: absolute;
width: 8em;
height: 8em;
opacity: 1;
border: 1px solid purple;

transform: ${props =>
    props.side === 'Left' ? 'translateX(-4em) rotateY(270deg)' :
      props.side === 'Right' ? 'translateX(4em) rotateY(90deg)' :
        props.side === 'Top' ? 'translateY(-4em) rotateX(90deg)' :
          props.side === 'Bottom' ? 'translateY(4em) rotateX(270deg)' :
            ''};
/* background-color: ${props => props.side === 'Top' ? 'white' : null}; */
background-image: url(${props => props.side !== 'Top' ? props.backImage : Logo});

background-size: cover;
`

const Back = styled(Side)`
transform: translateZ(-4em);
`

const Front = styled(Side)`
transform: translateZ(4em);
background-image: url(${props => props.backImage});
background-size: cover;
opacity: 1;
`

const LoadingAnimation = keyframes`
0% {
  width: 200px;
  height: 200px;
  transform: translateX(-100px) translateY(-100px) rotate(0deg);
}
50% {
  width: 100px;
  height: 100px;
  transform: translateX(-50px) translateY(-50px) rotate(360deg);
}
100% {
  width: 200px;
  height: 200px;
  transform: translateX(-100px) translateY(-100px) rotate(0deg);
}
`

const Loader = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50vh;
  left: 50vw;
  transform: translateX(-100px) translateY(-100px);
  background-image: url(${Logo});
  background-size: cover;
  animation: ${LoadingAnimation} 2s ease-in-out 0s infinite;
`

const LogoWrapper = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 20px 0 0;
`

const sides = ['Bottom', 'Left', 'Right', 'Top']

class App extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    images.originals.forEach((original) => {
      const img = new Image();
      img.src = original.fileName;
    });

    images.edited.forEach((edited) => {
      const img = new Image();
      img.src = edited.fileName;
    });

    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  render() {
    const { loading } = this.state

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isTabletOrMobileDevice = useMediaQuery({
    //   query: '(max-device-width: 1224px)'
    // })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return (
      <Page>
        {loading ? <Loader /> :
          (
            <>
              <Header>
                <LogoWrapper src={Logo} alt={'logo'} /><span>GANIMAPP</span>
              </Header>
              <WrapperOfWrapper>
                {images.originals.map((image, imageIndex) => {
                  const random = Math.floor(Math.random() * 3);

                  if (imageIndex < 40) {
                    return null
                  } else {

                    return <Wrapper key={image}>
                      <Container side={random === 0 ? 'Bottom' : random === 1 ? 'Left' : random === 2 ? 'Right' : 'Left'}>
                        <Back />

                        {sides.map((side, index) => {
                          return <Side side={side} backImage={index === random ? images.edited[imageIndex] : ''} />
                        })}

                        <Front backImage={image} />
                      </Container>
                    </Wrapper>
                  }
                })}

              </WrapperOfWrapper>
            </>
          )}

      </Page>

    )
  }
}

export default App
