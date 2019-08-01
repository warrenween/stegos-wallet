// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SettingsActions from '../../actions/settings';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import Modal from '../common/Modal/Modal';
import styles from './Blocker.css';
import type { SettingsStateType } from '../../reducers/types';

type Props = {
  settings: SettingsStateType,
  unlockWallet: string => void
};

class Blocker extends Component<Props> {
  props: Props;

  state = {
    password: '',
    unlocking: false
  };

  onUnlock() {
    const { unlockWallet, showError } = this.props;
    const { password } = this.state;
    this.setState({
      unlocking: true
    });
    unlockWallet(password)
      .then(() =>
        this.setState({
          password: '',
          unlocking: false
        })
      )
      .catch(e => {
        showError(e.message || 'Unlock wallet failed, please try again.');
        this.setState({
          password: '',
          unlocking: false
        });
      });
  }

  render() {
    const { settings } = this.props;
    const { isLocked } = settings;
    const { password, unlocking } = this.state;
    return (
      <Modal
        options={{
          title: 'Unlock wallet',
          type: 'small',
          visible: isLocked,
          showCloseButton: false
        }}
        style={{ width: 300 }}
      >
        <div className={styles.Container}>
          {!unlocking && (
            <Input
              placeholder="Enter password"
              value={password}
              type="password"
              onChange={e => this.setState({ password: e.currentTarget.value })}
            />
          )}
          {unlocking && <span>Unlocking wallet...</span>}
        </div>
        <div className={styles.ActionsContainer}>
          <Button
            type="OutlinePrimary"
            onClick={() => this.onUnlock()}
            disabled={unlocking}
          >
            Unlock
          </Button>
        </div>
      </Modal>
    );
  }
}

export default connect(
  state => ({ settings: state.settings }),
  dispatch => bindActionCreators(SettingsActions, dispatch)
)(Blocker);