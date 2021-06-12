import fetch from 'node-fetch';
import { ITaskModel, TaskStatus } from '../model/task.interface';
import logger from '../util/logger';

export const checkAndInvokeWebHook = async (task: ITaskModel) => {
  if (!task.webhook ) {
    return;
  }

  if ( task.status === TaskStatus.SUCCESS) {
    await fetch(task.webhook, {
      method: 'POST',
      body: JSON.stringify({
        isSuccess: true,
      })
    })

    logger.info(`[checkAndInvokeWebHook] success sent to webhook ${task.webhook}`)
    return;
  }
}