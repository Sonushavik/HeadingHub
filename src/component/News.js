import React, { Component } from "react";
import NewsItems from "../NewsItems";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    // Set the document title using the category prop
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews() {
    this.props.setProgress(0);

    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bc3e9dc2c52046d2b7e3bcb4dbf01100&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => { 
      this.updateNews();
    });
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.updateNews();
    });
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }); // Increment page number to load next set of data
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bc3e9dc2c52046d2b7e3bcb4dbf01100&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
  
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), // Append new articles to existing list
      totalResults: parsedData.totalResults,
      // loading: false,
    });
  };
  

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center m-0.5">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
        
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          
        </InfiniteScroll>

       
      </div>
    );
  }
}

export default News;
