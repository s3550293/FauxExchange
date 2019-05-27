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

        for(String code : codes) {

            double remainPrice = 0.0;
            double remainQty = 0.0;

            for(Transaction t : transactions) {
                if(t.code.equals(code)) {
                    if(t.type.equals("sell")) {

                        double lhs = t.value;
                        double rhs = 0.0;
                        double lhsqty = t.qty;
                        
                        for(Transaction e : transactions) {

                            if(!t.transactionId.equals(e.transactionId) || lhsqty == 0) {
                                
                                double rhsval = 0.0;

                                if(e.type.equals("buy")) {

                                    if((lhsqty - e.qty) < 0.0 ) {

                                        lhsqty = lhsqty - Math.abs((lhsqty - e.qty));
                                        rhsval = e.ppc * Math.abs((lhsqty - e.qty));

                                        remainPrice = e.ppc;
                                        remainQty = remainQty + (e.qty - Math.abs((lhsqty - e.qty)));

                                    } else {

                                        lhsqty = lhsqty - e.qty;
                                        rhsval = e.ppc * e.qty;

                                    }
                                }

                                rhs = rhs + rhsval;

                            } else {
                                break;
                            }
                        }

                        t.pnl = lhs - rhs;
                        tRepo.save(t);
                    }
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