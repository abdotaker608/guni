import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import useQuery from 'hooks/useQuery';
import useQueries from 'api/useQueries';
import Loading from 'components/Loading/Loading';
import Paginator from 'components/Paginator/Paginator';
import {FaHourglassStart as AwaitIcon, FaCheckCircle as DeliveredIcon} from 'react-icons/fa';

function Orders() {

    const user = useSelector(state => state.auth);

    const {getOrders} = useQueries();

    const [params, setParams] = useState({user: user?.id, page: 1});

    useEffect(() => {
        setParams({...params, user: user?.id});
    }, [user])

    const handlePageChange = (page) => setParams({...params, page});

    const {data, loading, error} = useQuery(getOrders, params);

    return (
        <div className='orders'>
            {
                loading ?
                <Loading minHeight={400}/>
                :
                (
                    error ?
                    <div className='py-5 px-2 text-danger text-center'>
                        <p>{error}</p>
                    </div>
                    :
                    (
                        data.results?.length > 0 ?
                        <div className='orders-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order No</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Created On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.results?.map(order => (
                                            <tr>
                                                <td>{order.id}</td>
                                                <td>{order.total_price}$</td>
                                                <td>
                                                    {
                                                        order.status === 1 ?
                                                        <DeliveredIcon color="#42c918"/>
                                                        :
                                                        <AwaitIcon color="#91d4ed"/>
                                                    }
                                                </td>
                                                <td>{new Date(order.created).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='mt-5 d-flex justify-content-center'>
                                <Paginator current={params.page} total={data?.total} onChange={handlePageChange} />
                            </div>
                        </div>
                        :
                        <div className='py-5 px-2 text-secondary text-center'>
                            <p>You don't have any orders yet!</p>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Orders
