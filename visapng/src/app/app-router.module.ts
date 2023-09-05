import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './gallery/gallery.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { VideoListComponent } from './video-list/video-list.component';
import { EditorComponent } from './editor/editor.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './login/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NavigateAwayFromLoginDeactivatorService } from './navigation/login.deactivator.service';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'gallery', canActivate: [AuthGuard], component: GalleryComponent },
    { path: 'play/:id', component: PlayerComponent, canActivate: [AuthGuard], data: { isChildroute: true } },
    { path: 'collaboration', component: CollaborationComponent, canActivate: [AuthGuard] },
    { path: 'myspace', component: MySpaceComponent, canActivate: [AuthGuard]},
    { path: 'edit/:id', component: EditorComponent, canActivate: [AuthGuard], data: { isChildroute: true }},
    { path: '', redirectTo: '/gallery', pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'timeline/:id', component: TimelineComponent, canActivate: [AuthGuard], data: { isChildroute: true } },
    { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard], data: { isChildroute: true } },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
];

export const ComponentList = [GalleryComponent,
    MySpaceComponent,
    CollaborationComponent,
    VideoListComponent,
    EditorComponent,
    PlayerComponent,
    LoginComponent,
    NavigationComponent,
    CategoryComponent,
    SearchComponent,
    TimelineComponent,
    AboutUsComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    ResetPasswordComponent
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [RouterModule]
})

export class AppRouter {
}
