import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../Decorative/Loader/index.jsx';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import judgeActions from '../../../actions/judgeActions';

class AdminJudges extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.fetchJudges();
    this.props.judgeEventListener();
  }
  render() {
    return (
      <div>
        {
          this.props.judges.isFetching &&
          <div className="empty-section">
            <h1><Loader color="#777" />Loading</h1>
          </div>
        }
        {
          !this.props.judges.isFetching &&
          this.props.judges.error &&
          <div className="empty-section">
            <h1>{this.props.judges.error.toString()}</h1>
          </div>
        }
        {
          !this.props.judges.isFetching &&
          !this.props.judges.error &&
          !this.props.judges.judges.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>No judges</h1>
              <OpenModalButton text="Add judge" />
            </div>
          </div>
        }
        {
          !this.props.judges.isFetching &&
          !this.props.judges.error &&
          this.props.judges.judges.length > 0 &&
          <table className="display-table">
            <tbody>
              {
                this.props.judges.judges.map((judge) => (
                  <tr key={judge.transactionHash}>
                    <th>{judge.args.juryMemberName}</th>
                    <td>{judge.args.juryMemberAddress}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

AdminJudges.propTypes = {
  judges: PropTypes.shape({
    judges: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  fetchJudges: PropTypes.func.isRequired,
  judgeEventListener: PropTypes.func.isRequired,
};
AdminJudges.defaultProps = {
  judges: {
    judges: []
  },
  isFetching: true,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...judgeActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminJudges);

