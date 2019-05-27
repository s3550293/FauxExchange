package com.g4.fauxexchange.service;

import java.util.List;
import java.util.LinkedList;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.g4.fauxexchange.model.Transaction;
import com.g4.fauxexchange.model.Order;

import com.g4.fauxexchange.dao.TransactionRepository;


@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository tRepo;

    @Override
    public boolean createTransaction(Order order) {
        Transaction t = new Transaction(order.getType(), order.getCode(), order.getPrice(), order.getQty(), order.getValue(), order.getUserId());
        tRepo.save(t);
        processTransactions(t);
        return true;
    }

    @Override
    public void processTransactions(Transaction transaction) {
        LinkedList<String> codes = new LinkedList<String>();
        List<Transaction> transactions = getTransactionsByUserId(transaction.userId);

        for(Transaction t : transactions) {
            if(!codes.contains(t.code)) {
                codes.add(t.code);
            }
        }

        /* for(String code : codes) {

            int remainIndex = 0;
            double remainPrice = 0.0;
            double remainQty = 0.0;

            for(Transaction t : transactions) {
                if(t.code.equals(code)) {
                    if(t.type.equals("sell")) {

                        double lhs = t.value;
                        double rhs = 0.0;
                        double lhsqty = t.qty;
                        
                        for(Transaction e : transactions) {
                            double rhsval = 0.0;

                            if(remainQty > 0.0) {
                                if(remainIndex == 0) {
                                    if((lhsqty - remainQty) < 0.0) {

                                        rhsval = e.ppc * lhsqty;


                                        remainPrice = e.ppc;
                                        remainQty = remainQty - lhsqty;

                                        lhsqty = lhsqty - lhsqty;
                                    } else {

                                        lhsqty = lhsqty - e.qty;
                                        rhsval = e.ppc * e.qty;

                                    }
                                }
                                remainIndex--;
                            } else {
                                if(!t.transactionId.equals(e.transactionId) || lhsqty == 0) {



                                    if(e.type.equals("buy")) {
                                        if((lhsqty - e.qty) < 0.0) {

                                            rhsval = e.ppc * lhsqty;

                                            remainPrice = e.ppc;
                                            remainQty = e.qty - lhsqty;

                                            lhsqty = lhsqty - lhsqty;

                                        } else {

                                            lhsqty = lhsqty - e.qty;
                                            rhsval = e.ppc * e.qty;

                                        }
                                    }

                                    rhs = rhs + rhsval;

                                    String ts = String.format("Transaction Calc[lhs=%f, rhs=%f, lhsqty=%f, remainPrice=%f, remainQty=%f]", 
                                    lhs, rhs, lhsqty, remainPrice, remainQty);
                                    System.out.println(ts);

                                    if(remainQty == 0.0) {
                                        remainIndex++;
                                    }
                                
                                } else {
                                    break;
                                }
                            }
                        }

                        t.pnl = lhs - rhs;
                        tRepo.save(t);
                    }
                }
            }
        } */

        for(String code : codes) {
            int index = 0;
            double pppc = 0.0;
            double pqty = 0.0;
            LinkedList<Transaction> test = new LinkedList<Transaction>(transactions);

            for(Transaction ut : transactions) {
                if(ut.getCode().equals(code) && ut.getType().equals("sell")) {
                    double lhs = ut.getValue();
                    double lhsqty = ut.getQty();
                    double rhs = 0.0;

                    for(Transaction t : test) {
                        double rhsval = 0.0;

                        if(t.getTransactionId().equals(ut.getTransactionId()) || lhsqty == 0) {
                            break;
                        } else {
                            if(t.getType().equals("buy") && t.getQty() > 0) {
                                if((lhsqty - t.getQty()) < 0.0) {
                                    rhsval = t.getPpc() * lhsqty;
                                    t.setQTY(t.getQty() - lhsqty);
                                    lhsqty = 0;
                                } else {
                                    rhsval = t.getPpc() * t.getQty();
                                    t.setQTY(t.getQty() - lhsqty);
                                    lhsqty = 0;
                                }
                            }

                            rhs = rhs + rhsval;
                        }

                        test.set(index, t);
                        index++;
                    }

                    ut.setPNL(lhs - rhs);
                    tRepo.save(ut);
                }
            }
        }
    }

    @Override
    public List<Transaction> getTransactions() {
        return tRepo.findAll();
    }

    @Override
    public List<Transaction> getTransactionsByUserId(String id) {
        return tRepo.findByUserId(id);
    }

}