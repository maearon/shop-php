package com.adidas.auth.component;

import java.util.List;

import org.springframework.stereotype.Component;

import com.adidas.auth.model.ActiveStorageAttachment;
import com.adidas.auth.repository.ActiveStorageAttachmentRepository;
import com.adidas.auth.repository.ActiveStorageBlobRepository;
import com.adidas.auth.utils.EntityUtils;

import jakarta.persistence.PreRemove;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ActiveStorageEventListener {

    private final ActiveStorageAttachmentRepository attachmentRepo;
    private final ActiveStorageBlobRepository blobRepo;

    @PreRemove
    public void preRemove(Object entity) {
        Long id = EntityUtils.extractId(entity);
        String recordType = entity.getClass().getSimpleName();

        List<ActiveStorageAttachment> attachments = attachmentRepo.findByRecordTypeAndRecordId(recordType, id);
        for (ActiveStorageAttachment a : attachments) {
            blobRepo.deleteById(a.getBlobId());
            attachmentRepo.delete(a);
        }
    }
}
