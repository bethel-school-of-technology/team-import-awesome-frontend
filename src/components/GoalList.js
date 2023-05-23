import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../css/goal-list.css';
import moment from 'moment';
import { FaTrophy } from 'react-icons/fa';

export function GoalList({ goals }) {
    // Filter goals based on whether they are completed or not
    const completedGoals = goals.filter((goal) => goal.completed);
    const incompleteGoals = goals.filter((goal) => !goal.completed);

    let newCurrentDate = new Date();
    let currentDate = moment.utc(newCurrentDate).format('MM/DD/YYYY');

    return (
        <div>
            <div>
                <div className="goalList">
                    <h2>Goal List</h2>
                    {incompleteGoals.length > 0 ? ( // conditional render to check if there are any goals in progress to display
                        <div>
                            <h3 className="category">In Progress:</h3>
                            {incompleteGoals
                                .sort((a, b) =>
                                    b.createdAt.localeCompare(a.createdAt)
                                )
                                .map((goal) => {
                                    let startDate = moment
                                        .utc(goal.startDate)
                                        .format('MM/DD/YYYY');
                                    let endDate = moment
                                        .utc(goal.endDate)
                                        .format('MM/DD/YYYY');

                                    const timeRemaining =
                                        moment(endDate).fromNow(true);
                                    return (
                                        <div key={goal.goalId}>
                                            <Card className="goalItem incomplete">
                                                <div>
                                                    <Link
                                                        to={`/goals/detail/${goal.goalId}`}
                                                    >
                                                        {goal.title}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <span>
                                                        Start Date: {startDate}
                                                    </span>{' '}
                                                    -{' '}
                                                    <span>
                                                        End Date: {endDate}
                                                    </span>
                                                    <br />
                                                    {currentDate > endDate ? (
                                                        <span>
                                                            Time Remaining: Out
                                                            of Time
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            Time Remaining:{' '}
                                                            {timeRemaining}{' '}
                                                        </span>
                                                    )}
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : (
                        // render if user has no goals in progress
                        <div>
                            <h3 className="category">In Progress:</h3>
                            <p>No Goals In Progress</p>
                        </div>
                    )}
                    {completedGoals.length > 0 ? ( // conditional render to check if there are any completed goals to display
                        <div>
                            <h3 className="category">Completed:</h3>
                            {completedGoals
                                .sort(
                                    (
                                        a,
                                        b // sorts goals based on createdAt property
                                    ) => b.createdAt.localeCompare(a.createdAt) // compares the createdAt dates for the goals in the array
                                    //  the array is sorted in descending order based on the createdAt property,
                                )
                                .map((goal) => {
                                    let startDate = moment
                                        .utc(goal.startDate)
                                        .format('MM/DD/YYYY');
                                    let endDate = moment
                                        .utc(goal.endDate)
                                        .format('MM/DD/YYYY');
                                    return (
                                        <div key={goal.goalId}>
                                            <Card className="goalItem complete">
                                                <div className="goal-title">
                                                    <FaTrophy />
                                                    <Link
                                                        to={`/goals/detail/${goal.goalId}`}
                                                    >
                                                        {goal.title}
                                                    </Link>
                                                    <FaTrophy />
                                                </div>
                                                <div>
                                                    <span>
                                                        Start Date: {startDate}
                                                    </span>{' '}
                                                    -{' '}
                                                    <span>
                                                        End Date: {endDate}
                                                    </span>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : (
                        // renders if user has no completed goals
                        <div>
                            <h3 className="category">Completed:</h3>
                            <p>No Goals Completed</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GoalList;
