import { Injectable, Input, NgZone  } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { MdDialogRef, MdDialog } from '@angular/material';

import { HttpClientService } from '../common/http-client.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BaseService } from '../common/base.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
/**
 * Configuration Service class
 */
export class MessageService extends BaseService {
    constructor(logger: LoggerService, httpClient: HttpClientService, private snackBar?: MdSnackBar,
        private zone?: NgZone, private dialog?: MdDialog) {
        super(logger, httpClient);

    }

    /**
     * Show snackbar message
     * @param message Accespts messages to be shown as a snackbar
     */
    showMessages(message, action, callback) {
        const snackBarRef = this.snackBar.open(message, action, {
            duration: 4500
        });

        snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
            callback();
        });
    }
    /**
     * Refresh the page to connect the service
     */
    reloadPage() {
        this.zone.runOutsideAngular(() => {
            location.reload();
        });
    }

    /**
     * On action saved/updated/deleted message to the user
     * @param message
     * @param action
     */
    showActionStatus(message, action) {
        this.snackBar.open(message, action, {
            duration: 4500
        });
    }
    /**
     * Just a simple alert
     */
    showAlert(message) {
        this.snackBar.open(message, '', {
            duration: 4500
        });
    }


    /**
     * confirmation message to user while deleting
     * @param message
     */
  confirm(message: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message }
    });

    return dialogRef.afterClosed();
  }

}
