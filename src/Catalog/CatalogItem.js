import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';

const CatalogItem = ({ data }) => {
    const getStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<MDBIcon key={i} icon={i < data.rating ? 'star' : 'star-o'} />);
        }
        return stars;
    };

    return (
        <MDBCard>
            {/* <LazyLoad height={200} offsetVertical={200}>
      </LazyLoad> */}
            <MDBCardImage className="img-fluid" src={data.imageData}  />
            <MDBCardBody>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <MDBCardText>{`$${data.price}`}</MDBCardText>
                <div>{getStars()}</div>
            </MDBCardBody>
        </MDBCard>
    );
};

export default CatalogItem;
