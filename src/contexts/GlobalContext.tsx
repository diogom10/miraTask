import React from 'react';
import {createActorContext} from '@xstate/react';
import {globalController} from '../controllers/globalController';
import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {mockData, Task} from '../models/Task';

const GlobalStateContext = createActorContext(globalController);
const useGlobalActor = GlobalStateContext.useActor;
const useGlobalSelector = GlobalStateContext.useSelector;
const useGlobalActorRef = GlobalStateContext.useActorRef;

const GlobalStateProvider = (props: PropsWithChildren) => {
  const navigation = useNavigation<any>();
  return (
    <GlobalStateContext.Provider
      machine={globalController.withContext({
        navigationController: navigation,
        currentTasks: mockData?.filter(a => !a?.completed) as [Task],
        completedTasks: mockData?.filter(a => a?.completed) as [Task],
      })}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export {
  useGlobalActor,
  useGlobalActorRef,
  useGlobalSelector,
  GlobalStateProvider,
};
