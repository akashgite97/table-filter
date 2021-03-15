import React from 'react';
import ReactTable from 'react-table-v6';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { firstName: 'aaaaa', status: 'Pending', visits: 155 },
        { firstName: 'aabFaa', status: 'Pending', visits: 155 },
        { firstName: 'adaAAaaa', status: 'Approved', visits: 1785 },
        { firstName: 'aAaaaa', status: 'Approved', visits: 175 },
        { firstName: 'adaSaaa', status: 'Cancelled', visits: 165 },
        { firstName: 'aasaaa', status: 'Cancelled', visits: 157 },
        { firstName: 'aweaaaaaewea', status: 'Approved', visits: 153 },
        { firstName: 'aaaaaa', status: 'Submitted', visits: 155 },
      ],
      columns: [],
      filteredData: [],
      searchInput: '',
      columns: [],
      pageSize: 20,
    };
  }

  componentDidMount() {
    /* axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${state.page}&size=${state.pageSize}`
      )
      .then((response) => {
        this.setState({
          data: response.data.data,
          pageCount: response.data.totalPages,
          isLoading: false,
        });
      }); */

    let columns = [
      {
        Header: 'First Name',
        accessor: 'firstName',
        sortable: false,
        show: true,
        displayValue: ' First Name',
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: false,
        show: true,
        displayValue: 'Status ',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        sortable: false,
        show: true,
        displayValue: ' Visits ',
      },
    ];
    this.setState({ columns });
  }
  handleChange = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput, data } = this.state;
    let filteredData = data.filter((value) => {
      return (
        value.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.status.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.visits
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    this.setState({ filteredData });
  };

  render() {
    let { data, searchInput, filteredData, columns } = this.state;
    return (
      <React.Fragment>
        <form>
          <input
            name='searchInput'
            value={searchInput || ''}
            onChange={this.handleChange}
            label='Search'
          />
        </form>

        <ReactTable
          data={filteredData && filteredData.length ? filteredData : data}
          columns={columns}
          className=''
        ></ReactTable>
      </React.Fragment>
    );
  }
}

export default App;
