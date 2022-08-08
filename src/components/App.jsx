import React, { Component } from 'react';
import api from '../api/api';
import Serchbar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import ImageGalleryItem from './imageGalleryItem/imageGalleryItem';
import Button from './button/button';
import { Watch } from 'react-loader-spinner';
import Modal from './modal/modal';


export class App extends Component {
  state = {
    page: 1,
    query: '',
    totalHits: null,
    data: [],
    showModal: false,
    objectModal: {},
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      this.dataRequest();
    }
  };

  async dataRequest() {
    const { page, query } = this.state;
    try {
      const data = await api(query, page);
      this.setState(prevState => ({
        data: [...prevState.data, ...data.hits],
        totalHits: data.totalHits,
        loading: true,
      }));
    } catch (error) {
      alert('error');
    } finally {
      this.setState({ loading: false });
    }
  };

  onSubmit = query => {
    if (this.state.query === query && this.state.page === 1) return;
    this.setState({ query, data: [], page: 1, totalHits: null });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  dataModal = (src, alt) => {
    this.setState({ objectModal: { src, alt } });
    this.toggleModal();
  };

  btnLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { data, showModal, objectModal, page, totalHits, loading } =
      this.state;
    const totalPage = Math.ceil(totalHits / 12);
    return (
      <div className="app">
        <Serchbar onSubmit={this.onSubmit} />
        {data.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem data={data} onModal={this.dataModal} />
          </ImageGallery>
        )}

        {loading === true && (
          <div className="loader">
            <Watch
              color="#3f51b5"
              ariaLabel="watch" />
          </div>
        )}
        {totalPage > page && <Button onClick={this.btnLoad} />}
        {showModal && (<Modal objectModal={objectModal} toggleModal={this.toggleModal} />

        )}
      </div>
    );
  }
}