// External imports including @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule, MdInputModule } from '@angular/material';
import { MdIconRegistry } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdDialogModule, MdChipsModule, MdNativeDateModule,
        MdDatepickerModule, MdTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { Ng2FloatBtnModule } from 'ng2-float-btn';
import { TagInputModule } from 'ngx-chips';
import { BlockUIModule } from 'ng-block-ui';

// Application specific imports
import { AppComponent } from './app.component';
import { ImportComponent } from './import/import.component';
import { AppRouter, ComponentList } from './app-router.module';
import { VideoListService } from './video-list/video-list.service';
import { HttpClientService } from './common/http-client.service';
import { ConfigService } from './common/config.service';
import { LoggerService } from './logger/logger.service';
import { AuthService } from './login/auth.service';
import { ImportService } from './import/import.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './login/auth.guard';
 
import { NavigateAwayFromLoginDeactivatorService } from './navigation/login.deactivator.service';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { MessageService } from './common/message.service';
import { CookieService } from 'ngx-cookie-service';
import {ActionService} from './common/action.service';
import { SearchService } from './search/search.service';
import { AssignService } from './assign/assign.service';

import { RouteInfo } from './common/route-info.service';
import { ActionsTagsComponent } from './actions-tags/actions-tags.component';
import { ActionsSketchComponent } from './actions-sketch/actions-sketch.component';
import { ActionsWhiteboardComponent } from './actions-whiteboard/actions-whiteboard.component';
import { ActionsQuestionComponent } from './actions-question/actions-question.component';
import { ActionsAnnotationComponent } from './actions-annotation/actions-annotation.component';
import { ActionsHotspotComponent } from './actions-hotspot/actions-hotspot.component';
import { ActionsLinksComponent } from './actions-links/actions-links.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VisapintegrationComponent } from './visapintegration/visapintegration.component';
import { AssignComponent } from './assign/assign.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentList,
    BookmarkComponent,
    ActionsTagsComponent,
    ActionsSketchComponent,
    ImportComponent,
    ActionsWhiteboardComponent,
    ActionsQuestionComponent,
    ActionsAnnotationComponent,
    ActionsHotspotComponent,
    ActionsLinksComponent,
    ConfirmDialogComponent,
    VisapintegrationComponent,
    AssignComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2FloatBtnModule,
    FlexLayoutModule,
    AppRouter,
    MdDialogModule,
    TagInputModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTabsModule,
    BlockUIModule,
  ],
  entryComponents: [ImportComponent, ConfirmDialogComponent, VisapintegrationComponent, AssignComponent
  ],
  providers: [VideoListService, HttpClientService, ConfigService,
    LoggerService, AuthService, AuthGuard, NavigateAwayFromLoginDeactivatorService, MessageService, CookieService,
    RouteInfo, ActionService, ImportService, SearchService, AssignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
