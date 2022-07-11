import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from './../../Models/activity';
import agent from './../api/agent';
import { v4 as uuid } from 'uuid'

export default class ActvityStore {
    setloadingInitial = (status: boolean) => {
        this.loadingInitial = status
    }
    // activities: Activity[] = []
    activityRegistery = new Map<string, Activity>()
    selectedActivity: Activity | undefined = undefined;
    editMode = false
    loading = false
    loadingInitial = true
    constructor() {
        makeAutoObservable(this, {
        })
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).
            sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                this.setActivity(activity)
            })
            this.setloadingInitial(false)


        } catch (error) {
            this.setloadingInitial(false)
            console.log(error)
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            runInAction(() => {
                this.selectedActivity = activity
            })
            this.setloadingInitial(false)
            return activity
        }

        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity
                })
                this.setloadingInitial(false)
                return activity;
            }
            catch (eror) {
                console.log(eror);
                this.setloadingInitial(false)
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]
        //this.activities.push(activity)
        this.activityRegistery.set(activity.id, activity)
    }
    private getActivity = (id: string) => {
        return this.activityRegistery.get(id);
    }
  /*   selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistery.get(id)
    }
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false
    } */
    createActivity = async (activity: Activity) => {
        this.loading = true
        activity.id = uuid()
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //  this.activities.push(activity);
                this.activityRegistery.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity]
                this.activityRegistery.set(activity.id, activity);
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                //     this.activities = [...this.activities.filter(x => x.id !== id)]
                this.activityRegistery.delete(id)
               /// if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => { this.loading = false; })
        }
    }

}

