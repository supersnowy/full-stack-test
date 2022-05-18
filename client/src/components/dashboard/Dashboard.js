import React, { useState, useEffect } from "react";
import { logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import SelectWalletModal from "../wallet/Modal";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { connectors } from "../wallet/Connectors";
import { truncateAddress } from "../wallet/utils";
const isEmpty = require("is-empty");

const Dashboard = () =>  {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  const [error] = useState("");

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="landing-copy col s12 center-align" style={{marginTop: "3rem"}}>
          <VStack justifyContent="center" alignItems="center" h="100vh">
            <HStack marginBottom="20px">
              <Text
                margin="0"
                lineHeight="1.15"
                fontSize={["1.5em", "2em", "3em", "4em"]}
                fontWeight="600"
              >
                <b>Welcome,</b> {!isEmpty(auth.user) && auth.user.name.split(" ")[0]}
                <br />
                <span className="flow-text grey-text text-darken-1">
                  You are logged into a James Test full-stack Page{" "}  👏
                </span>
              </Text>
              <Button onClick={onLogoutClick} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</Button>
            </HStack>
            <HStack>
              {!active ? (
                <Button onClick={onOpen}>Connect Wallet</Button>
              ) : (
                <Button onClick={disconnect}>Disconnect</Button>
              )}
            </HStack>
            <VStack justifyContent="center" alignItems="center" padding="10px 0">
              <HStack>
                <Text>{`Connection Status: `}</Text>
                {active ? (
                  <CheckCircleIcon color="green" />
                ) : (
                  <WarningIcon color="#cd5700" />
                )}
              </HStack>

              <Tooltip label={account} placement="right">
                <Text>{`Account: ${truncateAddress(account)}`}</Text>
              </Tooltip>
              <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
            </VStack>
            <Text>{error ? error.message : null}</Text>
          </VStack>
          <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
